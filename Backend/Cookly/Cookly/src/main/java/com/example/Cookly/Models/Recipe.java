public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String instructions;
    @Column(nullable = false, name = "ingredient_id")
    private List<List<Ingredient>, String> ingredients;
    @Column(nullable = false, name = "tag")
    private List<String> tags;
}