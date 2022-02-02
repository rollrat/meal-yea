// Meal Reservation System
//
//  data.dummy.js - dummy data for test
//
// Copyright rollrat. 2022. All rights reserved.

var dummy_meals = [
  {
    y: 2022,
    m: 2,
    d: 19,
    p: [
      ["밥", "국", "배/사과", "음료수", "순살치킨강정", "너비아니"],
      ["짬뽕찌게", "오징어튀김", "자장밥"],
      ["육개장", "에그타르트", "초콜릿 쿠키 칩"],
    ],
  },
];

function tryGetMealPlan(y, m, d) {
  for (var meal of dummy_meals) {
    if (meal.y == y && meal.m == m && meal.d == d) return meal;
  }
  return null;
}
