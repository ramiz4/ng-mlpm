import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MlpmComponent } from './mlpm.component';

describe('MlpmComponent', () => {
  let component: MlpmComponent;
  let fixture: ComponentFixture<MlpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MlpmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MlpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
