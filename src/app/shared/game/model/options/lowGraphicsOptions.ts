import { ERendererShadowQuality } from '../../../engine';
import { IBombermanGraphicsOptions } from './graphicsOptions.interface';

export class BombermanLowGraphicsOptions implements IBombermanGraphicsOptions {
  worldShadowEnabled = true;
  worldShadowQuality = ERendererShadowQuality.low;
  borderWallShadowEnabled = true;
  borderWallShadowQuality = ERendererShadowQuality.low;
  indestructibleWallShadowEnabled = false;
  indestructibleWallShadowQuality = ERendererShadowQuality.low;
  destructibleWallShadowEnabled = false;
  destructibleWallShadowQuality = ERendererShadowQuality.low;
  charactersShadowEnabled = true;
  charactersShadowQuality = ERendererShadowQuality.low;
  temporaryItemsShadowEnabled = true;
  temporaryItemsShadowQuality = ERendererShadowQuality.low;
}
