import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_cookly/Widets/bottom_navigator_bar.dart';

class editProfileScreen extends StatefulWidget {
  const editProfileScreen({Key? key}) : super(key: key);

  @override
  _editProfileScreenState createState() => _editProfileScreenState();
}

class _editProfileScreenState extends State<editProfileScreen> {
  //controlers for data editing
  final TextEditingController _name = TextEditingController(text: "adam");
  final TextEditingController _email = TextEditingController(text: "");
  final TextEditingController _password = TextEditingController(text: "");
  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavBar(
        currentIndex: 2,
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsetsDirectional.all(22),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                CircleAvatar(
                  backgroundColor: Colors.deepOrange[100],
                  radius: 55,
                  backgroundImage:
                      const AssetImage('lib/assets/placeholder.png'),
                ),
                const SizedBox(
                  height: 10,
                ),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Container(
                      padding: EdgeInsetsDirectional.all(8),
                      child: TextFormField(
                        controller: _name,
                        validator: (new_val) {
                          return new_val!.trim().isEmpty ? "Enter name" : null;
                        },
                        decoration: const InputDecoration(
                            focusedBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.deepOrangeAccent),
                            ),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(),
                            ),
                            focusColor: Colors.deepOrangeAccent,
                            fillColor: Colors.deepOrangeAccent,
                            labelText: 'Your name',
                            labelStyle:
                                TextStyle(color: Colors.deepOrangeAccent)),
                      ),
                    ),
                    Container(
                      padding: EdgeInsetsDirectional.all(8),
                      child: TextFormField(
                        controller: _email,
                        validator: (new_val) {
                          return new_val!.trim().isEmpty ? "Enter email" : null;
                        },
                        decoration: const InputDecoration(
                            focusedBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.deepOrangeAccent),
                            ),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(),
                            ),
                            focusColor: Colors.deepOrangeAccent,
                            fillColor: Colors.deepOrangeAccent,
                            labelText: 'Your email',
                            labelStyle:
                                TextStyle(color: Colors.deepOrangeAccent)),
                      ),
                    ),
                    Container(
                      padding: EdgeInsetsDirectional.all(8),
                      child: TextFormField(
                        controller: _password,
                        validator: (new_val) {
                          return new_val!.trim().isEmpty
                              ? "Enter password"
                              : null;
                        },
                        decoration: const InputDecoration(
                            focusedBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.deepOrangeAccent),
                            ),
                            border: OutlineInputBorder(
                              borderSide: BorderSide(),
                            ),
                            focusColor: Colors.deepOrangeAccent,
                            fillColor: Colors.deepOrangeAccent,
                            labelText: 'Your new password',
                            labelStyle:
                                TextStyle(color: Colors.deepOrangeAccent)),
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Container(
                      height: 70,
                      padding: const EdgeInsetsDirectional.all(10),
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shadowColor: Colors.transparent,
                          primary: Colors.deepOrangeAccent,
                          onPrimary: Colors.white,
                        ),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            //here goes the api call for updating
                            Navigator.pushNamed(context, 'profile');
                          }
                        },
                        child: const Text(
                          "Save changes",
                          style: TextStyle(
                            fontSize: 23,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    )
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
