import 'package:flutter/material.dart';

import '../models/Ingredient.dart';

class BottomNavBar extends StatelessWidget {
  BottomNavBar({Key? key, this.currentIndex = 0}) : super(key: key);
  static const IconData fastfood =
      IconData(0xe25a, fontFamily: 'MaterialIcons');
  static const IconData account_circle_rounded =
      IconData(0xf522, fontFamily: 'MaterialIcons');
  static const IconData library_books_outlined =
      IconData(0xe377, fontFamily: 'MaterialIcons');
  int currentIndex;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
        currentIndex: currentIndex,
        backgroundColor: Colors.white,
        selectedItemColor: Colors.deepOrangeAccent,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
              label: "Ingredients",
              icon: IconButton(
                icon: Icon(fastfood),
                onPressed: () async {
                  currentIndex = 0;
                  Navigator.pushNamed(context, 'main');
                },
              )),
          BottomNavigationBarItem(
            label: "Recipes",
            icon: IconButton(
              icon: Icon(library_books_outlined),
              onPressed: () async {
                currentIndex = 1;
                List<Ingredient> toSend = <Ingredient>[];
                Navigator.pushNamed(context, 'recipes', arguments: toSend);
              },
            ),
          ),
          BottomNavigationBarItem(
            label: "Profile",
            icon: IconButton(
              icon: Icon(account_circle_rounded),
              onPressed: () async {
                currentIndex = 2;
                Navigator.pushNamed(context, 'profile');
              },
            ),
          ),
        ]);
  }
}
