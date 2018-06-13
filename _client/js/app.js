$.ajax({
   url: 'http://localhost:8080/api/tasks',
   dataType: 'JSON',
   type: 'GET',

   success: function(data){

      // Vérifier la connexion
      if(data.name == "MongoError"){
         // Afficher le message d'erreur de connexion dans la console
         console.log(data.message)

      } else{
         // Afficher les données dans la console
         console.log(data)
   },

   error: function(err){
      // Afficher le message d'erreur de requête dans la console
      console.log(err)
   }
})