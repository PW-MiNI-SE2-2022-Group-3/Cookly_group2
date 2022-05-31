import 'package:flutter/material.dart';

import '../Widets/bottom_navigator_bar.dart';
import '../Widets/row_button.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({required Key key}) : super(key: key);

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavBar(
        currentIndex: 2,
      ),
      body: Padding(
        padding: EdgeInsetsDirectional.all(22),
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                backgroundColor: Colors.deepOrange[100],
                radius: 55,
                backgroundImage: const AssetImage('lib/assets/placeholder.png'),
              ),
              const SizedBox(
                height: 10,
              ),
              const Text(
                "adam",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 30,
                ),
              ),
              const Divider(
                thickness: 2,
              ),
              const Text(
                "Email placeholder",
                style: TextStyle(fontSize: 26),
              ),
              const Divider(
                thickness: 2,
              ),
              rowButton(context, 'Edit Profile', 'login', Colors.black),
              const Divider(
                thickness: 2,
              ),
              rowButton(context, "Log Out", "login", Colors.red),
              const Divider(
                thickness: 2,
              ),
              rowButton(context, 'Creators', 'creators', Colors.blue),
            ],
          ),
        ),
      ),
    );
  }
}
