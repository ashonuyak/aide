import { campaignStore } from './campaign.store';
import { panelsStore } from './panels.store';
import { wizardStore } from './wizard.store';

export function resetCampaignCreateStores() {
	campaignStore.reset();
	panelsStore.reset();
	panelsStore.setPanel('text-info');
	wizardStore.isEditMode.set(false);
}
