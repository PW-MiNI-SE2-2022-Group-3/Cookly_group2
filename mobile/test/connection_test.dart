import 'dart:convert';

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
      final resp = await client.get(cooklyProvider.ingredientUrl);
      Ingredient ing = Ingredient.fromName("Didntwork");
      if(resp.statusCode==200){
        var r = jsonDecode(resp.body);
        ing = Ingredient.fromName(r['name']);
      }
      expect(ing, isA<Ingredient>());
      expect(ing.name, "eggsMock");
    });

    test('returns 404 if the http call completes with an error', () async {
      final client = MockClient();

      // Use Mockito to return an unsuccessful response when it calls the
      // provided http.Client.
      when(client
          .get(Uri.parse(cooklyProvider.ingredientUrl.toString()+"/5")))
          .thenAnswer((_) async => http.Response('Not Found', 404));
      final resp = await client.get(Uri.parse(cooklyProvider.ingredientUrl.toString()+"/5"));
      expect(resp.statusCode, 404);
    });
  });
}
