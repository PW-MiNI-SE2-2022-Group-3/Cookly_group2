import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile_cookly/Utilities/provider.dart';
import 'package:mobile_cookly/models/ingredient.dart';


class MainMenuScreen extends StatefulWidget {
  const MainMenuScreen({required Key key}) : super(key: key);
  @override
  _MainMenuScreenState createState() => _MainMenuScreenState();
}

abstract class ListItem {
  /// The title line to show in a list item.
  Widget buildTitle(BuildContext context);

  /// The subtitle line, if any, to show in a list item.
  Widget buildSubtitle(BuildContext context);
}

class IngredientItem implements ListItem {
  final String ingredientName;
  final String ingredientAmount;

  IngredientItem(this.ingredientName, this.ingredientAmount);

  @override
  Widget buildTitle(BuildContext context) => Text(ingredientName);

  @override
  Widget buildSubtitle(BuildContext context) => SizedBox.shrink();
  // Widget buildSubtitle(BuildContext context) => Text(ingredientAmount);
}
class Controller extends GetxController{
  Future<Response>? ingredients = [].obs as Future<Response>?;

}
class _MainMenuScreenState extends State<MainMenuScreen> {
  CooklyProvider cooklyProvider = CooklyProvider();
  Future<Response>? ingredients;

  Future<List<Ingredient>> fetchAlbum() async {
    final response = await cooklyProvider.getIngredients();

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var r = Ingredient.listFromJson(jsonDecode(response.body));
      print(r);
      return r;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      print(response.statusCode);
      throw Exception('Failed to load album');
    }
  }
  late Future<List<Ingredient>> futureAlbum;

  @override
  void initState() {
    // TODO: implement initState
    futureAlbum = fetchAlbum();
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    // final Controller c = Get.put(Controller());
    // c.ingredients = cooklyProvider.getIngredients().obs();
    // print(ingredients);
    return MaterialApp(
      home: Scaffold(
        body:
          Container(
            child: FutureBuilder<List<Ingredient>>(
              future: futureAlbum,
              builder: (context, AsyncSnapshot snapshot) {
                if (!snapshot.hasData) {
                  print(snapshot);
                  return Center(child: CircularProgressIndicator());
                } else {
                  Container(
                      child: ListView.builder(
                          itemCount: snapshot.data.length,
                          scrollDirection: Axis.horizontal,
                          itemBuilder: (BuildContext context, int index) {
                            return Text('${snapshot.data[index].name}');
                          }));
                }

                // By default, show a loading spinner.
                return const CircularProgressIndicator();
              },
            )
            // child: Obx(()=>Text("${c.ingredients.toString()}")),
          )
          //
        // ListView.builder(
        //   // Let the ListView know how many items it needs to build.
        //   itemCount: items.length,
        //   // Provide a builder function. This is where the magic happens.
        //   // Convert each item into a widget based on the type of item it is.
        //   itemBuilder: (context, index) {
        //     final item = items[index];
        //
        //     return ListTile(
        //       title: item.buildTitle(context),
        //       subtitle: item.buildSubtitle(context),
        //     );
        //   },
        // ),
      ),
    );
  }
}
