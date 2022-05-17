import 'dart:collection';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_cookly/Utilities/apiProvider.dart';
import '../models/Ingredient.dart';
import '../models/Recipe.dart';

class RecipeScreen extends StatefulWidget {
  const RecipeScreen({required Key key}) : super(key: key);

  @override
  _RecipeScreenState createState() => _RecipeScreenState();
}


class _RecipeScreenState extends State<RecipeScreen> {
  late Future<List<Recipe>>  _fetchedData; //<== (1) here is your Future
  CooklyProvider cooklyProvider = CooklyProvider();







  late Future<List<Ingredient>> futureIngredients;

  @override
  void initState() {
    // TODO: implement initState
    _fetchedData = cooklyProvider.fetchRecipes([], http.Client());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as List<Ingredient>;

    return MaterialApp(
      home: Scaffold(
          body:
          Column(
            children: [
              Container(
                child:
                // Column(children: [
                FutureBuilder(
                  future: _fetchedData,
                  builder: (BuildContext context, AsyncSnapshot<List<Recipe>> snapshot) {
                    if (!(snapshot.connectionState == ConnectionState.waiting || !snapshot.hasData)) {
                      List<Recipe> fetchedRecipes = <Recipe>[];
                      (snapshot.data!).forEach((element) {
                        fetchedRecipes.add(element);
                      });

                      return Expanded(
                        child: ListView(
                          children: fetchedRecipes
                              .map(
                                (Recipe recipe) => Column(

                                  children: [
                                    Container(
                                      height:200,
                                      width: 200,
                                      child: Column(
                                        children: [
                                          Text(recipe.name, style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),),
                                          Text(recipe.instructions, style: TextStyle(fontSize: 15),),
                                          Text(recipe.ingredients.toString(), style: TextStyle(fontSize: 15),),
                                          // Text(recipe.tags.toString(), style: TextStyle(fontSize: 15),),
                                  ],
                                      ),
                                    )


                                  ],

                            ),
                          )
                              .toList(),
                        ),
                      );
                    } else {
                      print(snapshot);
                      return const Center(
                          child: CircularProgressIndicator(

                          )
                      );
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
              MaterialButton(onPressed: ()=>{
                Navigator.pushNamed(context, '')
              })

            ],
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
