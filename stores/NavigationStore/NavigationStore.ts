import { observable, action } from 'mobx';
import adminNav from '../../config/navigation/admin';

// import INavigationItem from '../../models/INavigationItem';

export class NavigationStore {
  @observable public small: boolean = true;

  @observable public navigation: any[] = [];

  @observable public pinned: boolean = false;

  @action public init() {
    this.pinned = localStorage.getItem('pinned') === 'true' && true;
    if (this.pinned) {
      this.small = false;
    }
  };

  @action public setNavigation(nav: string) {
    switch (nav) {
      case 'admin':
        this.navigation = adminNav;
        break;
      // case 'mod':
      //   this.navigation = modNav;
      //   break;
      // case 'user':
      //   this.navigation = userNav;
      //   break;
      default:
        this.navigation = [];
    }
  }

  @action public setPinned(pinned: boolean) {
    localStorage.setItem('pinned', pinned.toString());
    this.pinned = pinned;
  }
}

export default new NavigationStore();
