import 'package:flutter/material.dart';

import '../Widets/bottom_navigator_bar.dart';

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
              const CircleAvatar(
                backgroundColor: Colors.deepOrangeAccent,
                radius: 55,
                backgroundImage: AssetImage('lib/assets/placeholder.png'),
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
              const Text(
                "Email placeholder",
                style: TextStyle(fontSize: 22),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, "editProfile");
                },
                child: const Text(
                  "Edit Profile",
                  style: TextStyle(fontSize: 22),
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.pushNamed(context, "login");
                },
                child: const Text(
                  "Log Out",
                  style: TextStyle(fontSize: 22, color: Colors.red),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
