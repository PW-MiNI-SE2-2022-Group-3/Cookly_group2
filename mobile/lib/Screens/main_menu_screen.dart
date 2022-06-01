import 'dart:collection';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_cookly/Utilities/apiProvider.dart';

import '../Widets/bottom_navigator_bar.dart';
import '../models/Ingredient.dart';

class MainMenuScreen extends StatefulWidget {
  const MainMenuScreen({required Key key}) : super(key: key);

  @override
  _MainMenuScreenState createState() => _MainMenuScreenState();
}

class _MainMenuScreenState extends State<MainMenuScreen> {
  late Future<List<Ingredient>> _fetchedData; //<== (1) here is your Future
  LinkedHashMap<Ingredient, bool> tmpCopy = LinkedHashMap<Ingredient, bool>();
  var selectedIngredients = {Ingredient.fromName("testIng"): true};
  List<Ingredient> toSend = <Ingredient>[];
  CooklyProvider cooklyProvider = CooklyProvider();
  void onPressedButton() {
    int n = 0;
    tmpCopy.forEach((key, value) {
      if (value == true) {
        n++;
        toSend.add(key);
      }
    });

    Navigator.pushNamed(context, 'recipes', arguments: toSend);
  }

  Future<List<Ingredient>> fetchIngredients() async {
    final response = await http.post(
      cooklyProvider.ingredientUrl,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(
        {"name": ""},
      ),
    );
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var r = jsonDecode(response.body);

      List<Ingredient> ingredients = List.generate(r['ingredients'].length,
          (index) => Ingredient.fromName(r['ingredients'][index]['name']));
      ingredients.forEach((element) {
        selectedIngredients[element] = false;
      });
      return ingredients;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      print('error response code: ${response.statusCode}');
      throw Exception('Failed to load ingredients');
    }
  }

  Future<List<Ingredient>> fetchRecipes() async {
    final response = await http.post(
      cooklyProvider.ingredientUrl,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode(
        {"name": ""},
      ),
    );
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var r = jsonDecode(response.body);

      List<Ingredient> ingredients = List.generate(r['ingredients'].length,
          (index) => Ingredient.fromName(r['ingredients'][index]['name']));
      ingredients.forEach((element) {
        selectedIngredients[element] = false;
      });
      return ingredients;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      print('error response code: ${response.statusCode}');
      throw Exception('Failed to load ingredients');
    }
  }

  late Future<List<Ingredient>> futureIngredients;

  @override
  void initState() {
    _fetchedData = cooklyProvider.fetchIngredients(http.Client());
    selectedIngredients.clear();
    futureIngredients = fetchIngredients();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavBar(currentIndex: 0),
      body:
          // Column(
          //   children: [
          Container(
        child: FutureBuilder(
          future: _fetchedData,
          builder:
              (BuildContext context, AsyncSnapshot<List<Ingredient>> snapshot) {
            if (!(snapshot.connectionState == ConnectionState.waiting ||
                !snapshot.hasData)) {
              LinkedHashMap<Ingredient, bool> posts =
                  LinkedHashMap<Ingredient, bool>();

              (snapshot.data!).forEach((element) {
                posts[element] = false;
                // if(!tmpCopy.containsKey(element))
                //   tmpCopy[element] = false;
              });

              if (tmpCopy.isEmpty) {
                posts.forEach((key, value) {
                  tmpCopy[key] = value;
                });
              }
              List<Widget> widgets = <Widget>[];
              widgets.addAll(posts.keys
                  .map(
                    (Ingredient ingredient) => CheckboxListTile(
                      title: Text(ingredient.name),
                      value: tmpCopy[ingredient],
                      onChanged: (bool? value) {
                        setState(() {
                          print(posts);
                          if (tmpCopy[ingredient] == false) {
                            tmpCopy[ingredient] = true;
                          } else {
                            tmpCopy[ingredient] = false;
                          }
                          // tmpCopy[ingredient] = !tmpCopy[ingredient]!;
                          print(tmpCopy[ingredient]);
                          // tmpCopy = posts;
                        });
                      },
                    ),
                  )
                  .toList());
              widgets.add(
                MaterialButton(
                  key: Key("show_recipes_button_key"),
                  child: Text("Show my recipes"),
                  onPressed: () => {onPressedButton()},
                ),
              );
              return ListView(
                children: widgets,
              );
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          },
        ),
        //   MaterialButton(
        //     child: Text("Show recipes"),
        //     onPressed: ()=>{
        //       // Navigator.pushNamed(context, 'recipe')
        //     },
        //   ),
        // ],),

        // child: Obx(()=>Text("${c.ingredients.toString()}")),
      ),
      // MaterialButton(
      //   child: Text("Show my recipes"),
      //   onPressed: ()=>{
      //   onPressedButton(),
      //   Navigator.pushNamed(context, 'recipes', arguments:toSend)
      // },),

      // ],
      // )
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
    );
  }
}
