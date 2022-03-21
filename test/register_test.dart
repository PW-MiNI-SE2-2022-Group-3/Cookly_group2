import 'package:mobile_cookly/Screens/register_screen.dart';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';



Widget createFavoritesScreen() => const MaterialApp(
    home: RegisterScreen(key: Key("Register_screen_test")),
);


void main() {
  testWidgets('all text fields are found', (WidgetTester tester) async {
    // Build our app and trigger a frame.

    await tester
        .pumpWidget(createFavoritesScreen());
    await tester.pumpAndSettle();

    expect(find.byKey(Key("name_reg_TF")), findsOneWidget);
    expect(find.byKey(Key("password_reg_TF")), findsOneWidget);
    expect(find.byKey(Key("password_again_reg_TF")), findsOneWidget);
    expect(find.byKey(Key("email_reg_TF")), findsOneWidget);

  });
  testWidgets('Passwords not matching show error message', (WidgetTester tester) async {
    // Build our app and trigger a frame.

    await tester
        .pumpWidget(createFavoritesScreen());
    await tester.pumpAndSettle();
    var password_TF = find.byKey(Key("password_reg_TF"));
    var password_again_TF = find.byKey(Key("password_again_reg_TF"));
    //checking two different passwords
    await tester.enterText(password_TF, "Password123!");
    await tester.enterText(password_again_TF, "!321drowssap");
    await tester.tap(find.byKey(Key("register_button")));
    await tester.pump(Duration(seconds: 1));

    expect(find.text('Passwords do not match!'), findsOneWidget);

  });
  testWidgets('Passwords too short show error message', (WidgetTester tester) async {
    // Build our app and trigger a frame.

    await tester
        .pumpWidget(createFavoritesScreen());
    await tester.pumpAndSettle();
    var password_TF = find.byKey(Key("password_reg_TF"));
    var password_again_TF = find.byKey(Key("password_again_reg_TF"));
    //checking two different passwords
    await tester.enterText(password_TF, "pswrd1");
    await tester.enterText(password_again_TF, "pswrd1");
    await tester.tap(find.byKey(Key("register_button")));
    await tester.pump(Duration(seconds: 1));

    expect(find.text('Passwords are too short'), findsOneWidget);

  });
}
