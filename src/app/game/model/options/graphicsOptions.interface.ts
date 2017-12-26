import { ERendererShadowQuality } from '../../../shared/engine';

export interface IBombermanGraphicsOptions {
  worldShadowEnabled: boolean;
  worldShadowQuality: ERendererShadowQuality;
  borderWallShadowEnabled: boolean;
  borderWallShadowQuality: ERendererShadowQuality;
  indestructibleWallShadowEnabled: boolean;
  indestructibleWallShadowQuality: ERendererShadowQuality;
  destructibleWallShadowEnabled: boolean;
  destructibleWallShadowQuality: ERendererShadowQuality;
  charactersShadowEnabled: boolean;
  charactersShadowQuality: ERendererShadowQuality;
  temporaryItemsShadowEnabled: boolean;
  temporaryItemsShadowQuality: ERendererShadowQuality;
}
