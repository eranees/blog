app.get(
'/admin/dashboard',
AccessTokenGuard,
RoleGuard(UserType.AppUser), // Only Admins
(req, res) => {
res.json({ message: 'Welcome Admin!', user: req.user });
}
);
