import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_cookly/Screens/login_screen.dart';

void main() {
  testWidgets("Test to see if email text box is the same as user email",
      (WidgetTester tester) async {
    await tester.pumpWidget(LoginScreen(
      key: Key("LoginScreenTest"),
    ));
    final titleFinder = find.text('T');
    final messageFinder = find.text('M');
  });
}
