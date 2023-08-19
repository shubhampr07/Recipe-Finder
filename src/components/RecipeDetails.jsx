import { useEffect, useState } from "react";
import { getRecipe } from "../services/api";
import { Link, useParams } from "react-router-dom";
import { Button, Grid, Header, Segment } from "semantic-ui-react";


const RecipeDetails = () => {

    const [recipe, setRecipe] = useState({});

    const { recipeId } = useParams();

    useEffect(() => {
        const getData = async () => {
            let result = await getRecipe(recipeId)
            if (result && result.recipe) {
                setRecipe(result.recipe);
            }
        }
        getData();
    }, [])

    return(
        Object.keys(recipe).length > 0 ? 
        <Grid container stackable columns={2} className="DetailsPageContent">
            <Grid.Column>
                <Button as={Link} to={'/recipes'} content="Back to recipe list" color="yellow" style={{ marginBottom: 10 }} />
                <img src={recipe.image_url} className="detail-image"  />
            </Grid.Column>
            <Grid.Column>
                <Header size="medium">{recipe.title}</Header>
                <p>Provided By : {recipe.publisher}</p>
                <Button as={"a"} href={recipe.publisher_url} target="_blank" content="Publisher Site" color="blue" />
                <Button as={"a"} href={recipe.source_url} target="_blank" content="Recipe URL" color="green" />

                <Header size="large" content="Ingredients" />
                <Segment.Group>
                    {
                        recipe && recipe.ingredients.map(data => (
                            <Segment>
                                <h5>{data}</h5>
                            </Segment>
                        ))
                    }
                </Segment.Group>
            </Grid.Column>
        </Grid> : null
    )
}

export default RecipeDetails;