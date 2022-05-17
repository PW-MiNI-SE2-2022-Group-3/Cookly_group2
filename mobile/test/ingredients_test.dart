import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_cookly/Screens/login_screen.dart';
import 'package:mobile_cookly/Screens/main_menu_screen.dart';


Widget createIngredientsScreen() => const MaterialApp(
  home: MainMenuScreen(key: Key("Main_menu_screen")),
);


void main() {
  testWidgets("find ingredient tiles",
          (WidgetTester tester) async {
        await tester.pumpWidget(createIngredientsScreen());

        await tester.pumpAndSettle();

        expect(find.byKey(Key("show_recipes_button_key")), findsOneWidget);
        expect(find.byType(CheckboxListTile), findsWidgets);

      });
}
