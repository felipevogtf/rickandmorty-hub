import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCharacterComponent } from './favorite-character.component';

describe('FavoriteCharacterComponent', () => {
  let component: FavoriteCharacterComponent;
  let fixture: ComponentFixture<FavoriteCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
