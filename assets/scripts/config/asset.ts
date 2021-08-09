import { ASSET_EXTENSION, ASSET_KEY, ASSET_TYPE } from "../enum/asset";
import { AssetConfig } from "../interface/asset";

function getShopeeAssetUrl(url: string) {
  return `https://cf.shopee.co.id/file/${url}`;
}

export function getAssets() {
  const assets = new Array<AssetConfig>();

  assets.push({
    key: ASSET_KEY.APPLE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "sprite_apple",
  });
  assets.push({
    key: ASSET_KEY.SOUND_ON,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "sprite_sound_on",
  });
  assets.push({
    key: ASSET_KEY.SOUND_OFF,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "sprite_sound_off",
  });
  assets.push({
    key: ASSET_KEY.TROPHY,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "sprite_trophy",
  });
  assets.push({
    key: ASSET_KEY.WALL,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "sprite_wall",
  });

  assets.push({
    key: ASSET_KEY.BG_MUSIC,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "bg-music",
  });

  assets.push({
    key: ASSET_KEY.BUTTON_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "button-sfx",
  });

  assets.push({
    key: ASSET_KEY.CRASH_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "crash",
  });

  assets.push({
    key: ASSET_KEY.EAT_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "eat",
  });

  assets.push({
    key: ASSET_KEY.TURN_SFX,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "turn",
  });

  assets.push({
    key: ASSET_KEY.SHOPEE_BOLD,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "font/Shopee2021-Bold",
  });

  assets.push({
    key: ASSET_KEY.SHOPEE_MEDIUM,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "font/Shopee2021-Medium",
  });

  assets.push({
    key: ASSET_KEY.KEYPAD,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "keypad",
    config: {
      frameWidth: 124,
      frameHeight: 124,
      paddingX: 20,
      paddingY: 16,
    },
  });
  assets.push({
    key: ASSET_KEY.TILE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "sprite_tile",
    config: {
      frameWidth: 48,
      frameHeight: 48,
    },
  });
  assets.push({
    key: ASSET_KEY.SNAKE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "spritesheet_round",
    config: {
      frameWidth: 96,
      frameHeight: 96,
      paddingX: 1,
    },
  });

  return assets;
}
