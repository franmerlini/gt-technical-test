import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebShellUiLayoutComponent } from './web-shell-ui-layout.component';

describe('WebShellUiLayoutComponent', () => {
  let component: WebShellUiLayoutComponent;
  let fixture: ComponentFixture<WebShellUiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebShellUiLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebShellUiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
