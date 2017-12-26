import { ERendererShadowQuality } from '../../../shared/engine';
import { IBombermanGraphicsOptions } from './graphicsOptions.interface';

export class BombermanVeryLowGraphicsOptions implements IBombermanGraphicsOptions {
  worldShadowEnabled = false;
  worldShadowQuality = ERendererShadowQuality.low;
  borderWallShadowEnabled = false;
  borderWallShadowQuality = ERendererShadowQuality.low;
  indestructibleWallShadowEnabled = false;
  indestructibleWallShadowQuality = ERendererShadowQuality.low;
  destructibleWallShadowEnabled = false;
  destructibleWallShadowQuality = ERendererShadowQuality.low;
  charactersShadowEnabled = false;
  charactersShadowQuality = ERendererShadowQuality.low;
}
