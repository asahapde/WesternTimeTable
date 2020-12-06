import { Component, OnInit } from '@angular/core';
import { Policy } from '../Policy';
import { PolicyService } from '../policy.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policies: Policy[];
  editSelected = false;
  addSelected = false;

  securityBox;
  aupBox;
  dmcaBox;
  securityEditBox;
  aupEditBox;
  dmcaEditBox;



  constructor(private policyService: PolicyService, private authService: AuthService) {
    this.securityBox = '';
    this.aupBox = '';
    this.dmcaBox = '';
    this.securityEditBox = '';
    this.aupEditBox = '';
    this.dmcaEditBox = '';
  }

  ngOnInit(): void {
    this.policyService.getPolicy().subscribe(
      res => {
        this.policies = res;
      },
      err => {
        console.log(err);

      }
    );
  }

  addPolicy() {
    if (this.securityBox.length > 255) {
      alert('Security box must be less than 255 characters');
    } else if (this.aupBox.length > 255) {
      alert('AUP box must be less than 255 characters');
    } else if (this.dmcaBox.length > 255) {
      alert('DMCA box must be less than 255 characters');
    } else {
      let newPolicy = {
        security: this.securityBox,
        aup: this.aupBox,
        dmca: this.dmcaBox
      }

      this.policyService.createPolicy(newPolicy).subscribe(policy => {
        alert("Policy Added!");
        this.securityBox = '';
        this.aupBox = '';
        this.dmcaBox = '';
        this.refresh();
      }, err => {
        alert(err);
      });
    }
  }

  isAdmin() {
    return this.authService.getAdmin();
  }

  editSelect() {
    if (this.editSelected) {
      this.editSelected = false;
    } else {
      this.editSelected = true;
    }
  }

  addSelect() {
    console.log(this.isAdmin());
    if (this.addSelected) {
      this.addSelected = false;
    } else {
      this.addSelected = true;
    }
  }

  refresh() {
    this.policyService.getPolicy().subscribe(
      res => {
        this.policies = res;
      },
      err => {
        console.log(err);

      }
    );
  }

  editPolicy(policy) {
    if (this.securityEditBox.length > 255) {
      alert('Security edit box must be less than 255 characters');
    } else if (this.aupEditBox.length > 255) {
      alert('AUP edit box must be less than 255 characters');
    } else if (this.dmcaEditBox.length > 255) {
      alert('DMCA edit box must be less than 255 characters');
    } else {
      let newPolicy = {
        security: this.securityEditBox,
        aup: this.aupEditBox,
        dmca: this.dmcaEditBox,
        _id: policy._id
      }

      this.policyService.editPolicy(newPolicy).subscribe(policy => {
        alert("Policy Edited!");
        this.securityEditBox = '';
        this.aupEditBox = '';
        this.dmcaEditBox = '';
        this.refresh();
      }, err => {
        alert(err);
      });
    }
  }

}
