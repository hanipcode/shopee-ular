import { game } from "cc";
import { LOCAL_STORAGE_KEY } from "../enum/localStorage";
import { GAME_EVENT } from "../enum/game";

export function getHighscoreFromLocalStorage() {
  return (
    Number(localStorage.getItem(LOCAL_STORAGE_KEY.COCOS_SNAKE_HIGHSCORE)) || 0
  );
}

export function updateLocalStorageHighscore(highscore: number) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY.COCOS_SNAKE_HIGHSCORE,
    Math.round(highscore).toString()
  );
}

export function getSoundStateFromLocalStorage() {
  const state = localStorage.getItem(LOCAL_STORAGE_KEY.COCOS_SNAKE_SOUND);

  if (state === undefined || state === null) {
    return true;
  }

  return Boolean(Number(state));
}

export function updateLocalStorageSoundState(state: boolean) {
  const value = state ? 1 : 0;
  localStorage.setItem(LOCAL_STORAGE_KEY.COCOS_SNAKE_SOUND, value.toString());

  game?.emit(GAME_EVENT.SOUND_STATE_CHANGE, state);
}
