import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSubscriptionPage } from './edit-subscription.page';

describe('EditSubscriptionPage', () => {
  let component: EditSubscriptionPage;
  let fixture: ComponentFixture<EditSubscriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
