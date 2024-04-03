>[!NOTE]
**.env**
DATABASE=mongodb+srv://tpapi:1111@cluster0.chewzja.mongodb.net/movie-finder?retryWrites=true&w=majority&appName=Cluster0
PORT=8000

> [!NOTE]
**MOVIES ROUTES**
/movies/latest => add parameter == page (limit es constante)

/movies/search => searcher (no usar verbos)

/movies/rating => cambiar POST a PUT

>[!IMPORTANT]
**COMO HACER LAS BUSQUEDAS?**
si mostramos 15 y al escrollear mostramos 15 mas, que pasa si hacemos clic en 'ordenar por' o 'filtrar genero'
debería generar la busqueda de nuevo pero haciendo el llamado de forma ordenada
o recibimos todas las movies, renderizamos solo de a 15 y al ordenar lo hacemos desde el front

