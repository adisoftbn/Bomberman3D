import { ERendererShadowQuality } from '../../../shared/engine';
import { IBombermanGraphicsOptions } from './graphicsOptions.interface';

export class BombermanHighGraphicsOptions implements IBombermanGraphicsOptions {
  worldShadowEnabled = true;
  worldShadowQuality = ERendererShadowQuality.high;
  borderWallShadowEnabled = true;
  borderWallShadowQuality = ERendererShadowQuality.high;
  indestructibleWallShadowEnabled = true;
  indestructibleWallShadowQuality = ERendererShadowQuality.high;
  destructibleWallShadowEnabled = true;
  destructibleWallShadowQuality = ERendererShadowQuality.high;
  charactersShadowEnabled = true;
  charactersShadowQuality = ERendererShadowQuality.high;
  temporaryItemsShadowEnabled = true;
  temporaryItemsShadowQuality = ERendererShadowQuality.high;
}
