import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebShellUiFooterComponent } from './web-shell-ui-footer.component';

describe('WebShellUiFooterComponent', () => {
  let component: WebShellUiFooterComponent;
  let fixture: ComponentFixture<WebShellUiFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebShellUiFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebShellUiFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
