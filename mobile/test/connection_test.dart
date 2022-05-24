import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_cookly/models/Ingredient.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import '../lib/Utilities/apiProvider.dart';
import 'connection_test.mocks.dart';

// Generate a MockClient using the Mockito package.
// Create new instances of this class in each test.
@GenerateMocks([http.Client])
void main() {
  CooklyProvider cooklyProvider = new CooklyProvider();
  group('fetchIngredient', () {
    test('returns an Ingredient if the http call completes successfully', () async {
      final client = MockClient();

      // Use Mockito to return a successful response when it calls the
      // provided http.Client.
      // when(cooklyProvider.
      // fetchIngredients(client)).
      // thenAnswer((_) async=>Ingredient.listFromJson(["egssMock", "chickenMock"]));
      when(client
          .get(cooklyProvider.ingredientUrl))
          .thenAnswer((_) async =>
          http.Response('{"name": "eggsMock", "id": 2}', 200));

      expect(await (client.get(cooklyProvider.ingredientUrl)), isA<http.Response>());
    });

    test('throws an exception if the http call completes with an error', () {
      final client = MockClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(client
          .get(Uri.parse(cooklyProvider.ingredientUrl.toString()+"/5")))
          .thenAnswer((_) async => throw Exception);

      expect(client.get(Uri.parse(cooklyProvider.ingredientUrl.toString()+"/5")), throwsException);
    });
  });
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // import '../lib/Utilities/apiProvider.dart';
// // import 'package:flutter/cupertino.dart';
// // import 'package:flutter/material.dart';
// // import 'package:flutter_test/flutter_test.dart';
// // import 'package:mobile_cookly/Screens/login_screen.dart';
// //
// //
// //
// // Widget createLoginScreen() => const MaterialApp(
// //   home: LoginScreen(key: Key("Register_screen_test")),
// // );
// //
// //
// // void main() {
// //   testWidgets("Test API connections",
// //           (WidgetTester tester) async {
// //         await tester.pumpWidget(createLoginScreen());
// //
// //         await tester.pumpAndSettle();
// //
// //         expect(find.byKey(Key("email_TF")), findsOneWidget);
// //         expect(find.byKey(Key("password_TF")), findsOneWidget);
// //
// //       });
// // }