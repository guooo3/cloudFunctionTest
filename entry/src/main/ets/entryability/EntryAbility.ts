import hilog from '@ohos.hilog';
import UIAbility from '@ohos.app.ability.UIAbility';
import Window from '@ohos.window';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import { initialize } from '@hw-agconnect/hmcore';
import util from '@ohos.util';

export default class EntryAbility extends UIAbility {
  async onCreate() {
    let input = await this.context.resourceManager.getRawFileContent('agconnect-services.json')
    let jsonString  = util.TextDecoder.create('utf-8', {
      ignoreBOM: true
    }).decodeWithStream(input, {
      stream: false
    });

    initialize(this.context, JSON.parse(jsonString));

    let AtManager = abilityAccessCtrl.createAtManager();
    AtManager.requestPermissionsFromUser(this.context, ['ohos.permission.READ_MEDIA', 'ohos.permission.MEDIA_LOCATION']).then((data) => {
      hilog.info(0x0000, 'testTag', '%{public}s', 'request permissions from user success' + data);
    }).catch((err) => {
      hilog.error(0x0000, 'testTag', 'Failed to request permissions from user. Cause: %{public}s', JSON.stringify(err) ?? '');
    });
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
  }

  onDestroy() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: Window.WindowStage) {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/MyIndex', (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
    });
  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground() {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}
