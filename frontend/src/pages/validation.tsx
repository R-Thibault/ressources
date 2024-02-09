import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { VALIDATE_ACCOUNT, RESEND_VALIDATION_EMAIL } from '../Request/user';

export default function ValidateAccountPage() {

  const router = useRouter();
  
  // Extraction du token de l'URL
  const query = router.query;
  const [validateAccount, { data, loading, error }] = useMutation(VALIDATE_ACCOUNT, {
    variables: { token: query.token },
    
  });

 useEffect(() => {
  if(query.token){
      validateAccount({
        variables: { token: query.token },
        
      });
    }
 }, [query,validateAccount ])


console.log(query)
  return (
    <div>
      {loading && <p>Validation en cours...</p>}
      {error && <p>Erreur lors de la validation du compte: {error.message }</p>}
      {data && <p>Votre compte a été validé avec succès!</p>}
    </div>
  );
};


// onCompleted: (data) => {
//     // Gérer la réussite de la validation,  afficher un message de succès ou rediriger vers une autre page?
//     console.log('Compte validé avec succès');
//     // router.replace('/compte-valide'); // on redirige vers sing-in
//   },
//   onError: (error) => {
   
//   }



  //if(error){
    // if ()) {
    //     // Rediriger l'utilisateur vers une page/component
    //     // où il peut demander le renvoi de l'email de validation
    //     router.replace('/token-expired');
    //   } else {
    //     // Gérer d'autres types d'erreurs
    //     console.error("Erreur lors de la validation du compte: ", error.message);
    //   }
  //  }