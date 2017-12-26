import { ERendererShadowQuality } from '../../../shared/engine';
import { IBombermanGraphicsOptions } from './graphicsOptions.interface';

export class BombermanMediumGraphicsOptions implements IBombermanGraphicsOptions {
  worldShadowEnabled = true;
  worldShadowQuality = ERendererShadowQuality.medium;
  borderWallShadowEnabled = true;
  borderWallShadowQuality = ERendererShadowQuality.medium;
  indestructibleWallShadowEnabled = true;
  indestructibleWallShadowQuality = ERendererShadowQuality.medium;
  destructibleWallShadowEnabled = false;
  destructibleWallShadowQuality = ERendererShadowQuality.medium;
  charactersShadowEnabled = true;
  charactersShadowQuality = ERendererShadowQuality.medium;
  temporaryItemsShadowEnabled = true;
  temporaryItemsShadowQuality = ERendererShadowQuality.medium;
}
