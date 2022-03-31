import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_cookly/Screens/login_screen.dart';



Widget createLoginScreen() => const MaterialApp(
  home: LoginScreen(key: Key("Register_screen_test")),
);


void main() {
  testWidgets("Email and password texfields are rendered on screen",
          (WidgetTester tester) async {
        await tester.pumpWidget(createLoginScreen());

        await tester.pumpAndSettle();

        expect(find.byKey(Key("email_TF")), findsOneWidget);
        expect(find.byKey(Key("password_TF")), findsOneWidget);

      });
}
