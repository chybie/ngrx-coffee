import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';

import { PayComponent } from './pay.component';

import * as i from '../../state/app.interfaces';
import { appReducer } from '../../state/app.reducer';
import { appInitialState } from '../../state/app.init';
import { AddToCart, GetCoffeeListSuccess } from '../../state/app.actions';

describe('PayComponent', () => {
  let component: PayComponent;
  let fixture: ComponentFixture<PayComponent>;
  let store: Store<i.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(
          { app: appReducer },
          { initialState: { app: appInitialState } }
        )
      ],
      declarations: [ PayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return total 0', () => {
    // arrange
    const { nativeElement } = fixture.debugElement.query(By.css('.pay'));
    const expected = 'Total: $0.00';

    // assert
    expect((<HTMLAnchorElement>nativeElement).innerText).toBe(expected);
  });

  it('should return total 12', () => {
    // arrange
    const { nativeElement } = fixture.debugElement.query(By.css('.pay'));
    const expected = 'Total: $12.00';

    // action
    store.dispatch(new GetCoffeeListSuccess([
      { name: 'coffee aa', price: 5, recipe: [] },
      { name: 'coffee bb', price: 2, recipe: [] },
    ]));
    store.dispatch(new AddToCart('coffee aa'));
    store.dispatch(new AddToCart('coffee aa'));
    store.dispatch(new AddToCart('coffee bb'));
    fixture.detectChanges();

    // assert
    expect((<HTMLAnchorElement>nativeElement).innerText).toBe(expected);
  });
});
