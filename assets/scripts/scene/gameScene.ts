import { _decorator, Component, Node, director } from "cc";
import { getLevelConfig } from "../config/level";
import { GameControl } from "../control/gameControl";
import { GAME_CONTROL_EVENT } from "../enum/gameControl";
import { GAME_OVER_POP_UP_EVENT } from "../enum/gameOverPopUp";
import { INVALID_SNAKE_POP_UP_EVENT } from "../enum/invalidSnakePopUp";
import { SCENE_KEY } from "../enum/scene";
import { SCORE_MANAGER_EVENT } from "../enum/scoreManager";
import { TRANSITION_SCREEN_EVENT } from "../enum/transitionScreen";
import { BoardConfig } from "../interface/board";
import { SnakeConfig } from "../interface/snake";
import { updateLocalStorageHighscore } from "../lib/util/localStorage";
import { GameBoard } from "../object/gameBoard";
import { GameHeader } from "../object/gameHeader";
import { GameOverPopUp } from "../object/gameOverPopUp";
import { InvalidSnakePopUp } from "../object/invalidSnakePopUp";
import { ScoreManager } from "../object/scoreManager";
import { Snake } from "../object/snake";
import { TransitionScreen } from "../sprite/transitionScreen";
const { ccclass, property } = _decorator;

@ccclass("GameScene")
export class GameScene extends Component {
  @property(GameBoard)
  public readonly gameBoard?: GameBoard;

  @property(Snake)
  public readonly snake?: Snake;

  @property(GameControl)
  public readonly gameControl?: GameControl;

  @property(GameHeader)
  public readonly gameHeader?: GameHeader;

  @property(ScoreManager)
  public readonly scoreManager?: ScoreManager;

  @property(GameOverPopUp)
  public readonly gameOverPopUp?: GameOverPopUp;

  @property(InvalidSnakePopUp)
  public readonly invalidSnakePopUp?: InvalidSnakePopUp;

  @property(TransitionScreen)
  public readonly transitionScreen?: TransitionScreen;

  start() {
    const { boardConfig, snakeConfig } = getLevelConfig();
    this.generateBoard(boardConfig);
    const isValidSnake = this.isSnakeConfigValid(snakeConfig);
    if (isValidSnake) {
      this.generateSnake(snakeConfig);
      this.generateFruit();
    }

    this.transitionScreen?.fadeOut(0.5);
    this.transitionScreen?.node.once(
      TRANSITION_SCREEN_EVENT.FADE_OUT_COMPLETE,
      () => {
        if (isValidSnake) {
          this.gameControl?.node.once(GAME_CONTROL_EVENT.GAME_OVER, () => {
            this.gameOver();
          });

          this.gameControl?.node.once(
            GAME_CONTROL_EVENT.CHANGE_SNAKE_DIRECTION,
            () => {
              this.startGame();
            }
          );
        } else {
          this.invalidSnake();
        }
      }
    );
  }

  private generateBoard(config: BoardConfig) {
    const { tiles } = config;

    this.gameBoard?.generateBoardFromLevelConfig(tiles);
    this.gameBoard?.generateBoardSprites();
  }

  private generateSnake(config: SnakeConfig) {
    const { gameBoard, snake } = this;

    if (!gameBoard || !snake) return;

    const { parts } = config;
    parts.forEach((val) => {
      const { x, y } = val;
      const { x: posX, y: posY } = gameBoard.getTilePosition(x, y);
      snake.addPart(x, y, posX, posY);
    });
    snake.initialize(config);
  }

  private generateFruit() {
    if (this.snake) {
      this.gameBoard?.spawnRandomFruit(this.snake);
    }
  }

  private isSnakeConfigValid(config: SnakeConfig) {
    const { parts } = config;

    /**
     * Snake minimum length has to be 3 (head, body, tail)
     */
    if (parts.length < 3) {
      return false;
    }

    /**
     * Snake cannot occupy unsafe tiles
     */
    const snakeOccupyUnsafeTile = parts.reduce((res, part) => {
      const { x, y } = part;
      const tile = this.gameBoard?.getTileIfSafe(x, y);

      if (!tile) return true;

      return res;
    }, false);

    if (snakeOccupyUnsafeTile) {
      return false;
    }

    /**
     * Snake parts have to be 1 manhattan apart from each other
     */
    const snakePartsOneManhattanApart = parts.reduce(
      (res, part, index, arr) => {
        const nextPart = arr[index + 1];

        if (nextPart) {
          const tileDistance =
            Math.abs(part.x - nextPart.x) + Math.abs(part.y - nextPart.y);
          return tileDistance === 1;
        }

        return res;
      },
      true
    );

    if (!snakePartsOneManhattanApart) {
      return false;
    }

    return true;
  }

  private startGame() {
    this.gameHeader?.hideGuide();
    this.gameHeader?.showScore();

    this.scoreManager?.node.on(
      SCORE_MANAGER_EVENT.SCORE_UPDATE,
      (score: number) => {
        this.gameHeader?.updateScore(score);
      }
    );
    this.scoreManager?.node.on(
      SCORE_MANAGER_EVENT.HIGHSCORE_UPDATE,
      (highscore: number) => {
        this.gameHeader?.updateHighscore(highscore);
      }
    );
    this.gameControl?.node.on(GAME_CONTROL_EVENT.EAT_FRUIT, () => {
      this.scoreManager?.addScore(1);
    });

    this.scoreManager?.initialize();
    this.gameControl?.startGame();
  }

  private gameOver() {
    updateLocalStorageHighscore(this.scoreManager?.getHighscore() || 0);

    this.gameOverPopUp?.show();
    this.gameOverPopUp?.setScore(this.scoreManager?.getScore() || 0);

    this.gameOverPopUp?.node.once(GAME_OVER_POP_UP_EVENT.CANCEL, () => {
      this.gameOverPopUp?.unregisterTouchEvent();
      this.goToScene(SCENE_KEY.TITLE);
    });

    this.gameOverPopUp?.node.once(GAME_OVER_POP_UP_EVENT.PLAY_AGAIN, () => {
      this.gameOverPopUp?.unregisterTouchEvent();
      this.goToScene(SCENE_KEY.GAME);
    });

    this.scheduleOnce(() => {
      this.gameOverPopUp?.registerTouchEvent();
    }, 0.3);
  }

  private goToScene(sceneKey: SCENE_KEY) {
    this.transitionScreen?.fadeIn(0.5);
    this.transitionScreen?.node.once(
      TRANSITION_SCREEN_EVENT.FADE_IN_COMPLETE,
      () => {
        director.loadScene(sceneKey);
      }
    );
  }

  private invalidSnake() {
    this.invalidSnakePopUp?.show();

    this.invalidSnakePopUp?.node.once(INVALID_SNAKE_POP_UP_EVENT.CANCEL, () => {
      this.invalidSnakePopUp?.unregisterTouchEvent();
      this.goToScene(SCENE_KEY.TITLE);
    });

    this.scheduleOnce(() => {
      this.invalidSnakePopUp?.registerTouchEvent();
    }, 0.3);
  }
}
