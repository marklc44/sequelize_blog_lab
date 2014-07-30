<h2>Edit Post: </h2>

<form class="stacked" action="/posts" method="post">
	<label for="post-author">Author:</label>
	<select name="post[authorId]" id="post-author">

		<% authors.forEach(function(author) { %>
		<option value="<%= author.dataValues.id %>">
			<%= author.dataValues.name %>
		</option>
		<% }) %>

	</select>
	<label for="post-title">Title:</label>
	<input type="text" name="post[title]" id="post-title" value="<%= post.dataValues.title %>" placeholder="Post title">
	<label for="post-content"></label>
	<textarea name="post[content]" value="<%= post.dataValues.content %>" id="post-content" cols="30" rows="10"></textarea>
	<input type="submit" value="Publish">
</form>