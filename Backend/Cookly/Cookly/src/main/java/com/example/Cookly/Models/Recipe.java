@Entity
@Table(name="Recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String instructions;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructions() {
        return instructions;
    }

    public Set<User> getUsersWhoLiked() {
        return usersWhoLiked;
    }

    public void setUsersWhoLiked(Set<User> usersWhoLiked) {
        this.usersWhoLiked = usersWhoLiked;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Set<Ingredient> getIngredientsUsedInRecipe() {
        return ingredientsUsedInRecipe;
    }

    public void setIngredientsUsedInRecipe(Set<Ingredient> ingredientsUsedInRecipe) {
        this.ingredientsUsedInRecipe = ingredientsUsedInRecipe;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @ManyToMany
    @JoinTable(
            name = "ingredients_used_in_recipe",
            joinColumns = @JoinColumn(name = "id"),//recipe id
            inverseJoinColumns = @JoinColumn(name = "id"))//ingredient id
    Set<Ingredient> ingredientsUsedInRecipe;

    @ManyToMany(mappedBy = "likedRecipes")
    Set<User> usersWhoLiked;

    @Column(nullable = false, name = "tag")
    private List<String> tags;

}