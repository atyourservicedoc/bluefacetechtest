import { Component, Injector, OnInit, LOCALE_ID } from '@angular/core';
import { IProfile, ProfileService } from '../profile/profile.service';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user?: IProfile;
  public profileService: ProfileService;
  public firstNamePlaceholder: string;
  public lastNamePlaceholder: string;
  public formFirstName?: string;
  public formLastName?: string;
  public error?: string;
  public isLoading: boolean;
  public isSaving: boolean;

  constructor(private injector: Injector) {
    this.profileService = this.injector.get(ProfileService)
    this.firstNamePlaceholder = '';
    this.lastNamePlaceholder = '';
    this.isLoading = false;
    this.isSaving = false;
  }

  ngOnInit(): void {
    this.fetchGetProfileUser();
  }

  fetchGetProfileUser() {
    this.isLoading = true;
    this.profileService.getProfileUser().then((result) => {
      this.displayLoadedData(result);
      this.isLoading = false;
    }, (error) => {
      this.fetchGetProfileUser();
    });
  }

  saveProfile() {
    this.clearError();
    if (!!this.formFirstName && !!this.formLastName) {
      this.isSaving = true;
      this.profileService.setName(this.formFirstName, this.formLastName).then((result)=>{
        this.displayLoadedData(result);
        this.isSaving = false;
      },(error) => {
        this.isSaving = false;
        this.error = error.error;
      })
    }
  }

  displayLoadedData(user: IProfile) {
    this.user = user;
    this.firstNamePlaceholder = this.user.firstName;
    this.lastNamePlaceholder = this.user.lastName;
  }

  clearError() {
    console.log('cleared');
    this.error = undefined;
  }

}
