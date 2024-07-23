import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_RESSOURCE } from "@/requests/ressources";
import { RessourceType } from "@/types/ressources.types";
import { Form, Alert } from "react-bootstrap";

type UpdateRessourceFormProps = {
    ressource: RessourceType;
    onClose: () => void;
};

export default function EditRessourceForm({ ressource, onClose }: UpdateRessourceFormProps) {
    const [title, setTitle] = useState(ressource.title);
    const [description, setDescription] = useState(ressource.description);
    const [updateRessource, { error }] = useMutation(UPDATE_RESSOURCE);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateRessource({
                variables: {
                    id: ressource.id,
                    data: { title, description },
                },
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Titre de la ressource</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </Form.Group>
            <button type="submit" className="btn_primary">
                Mettre à jour
            </button>
            {error && (
                <Alert variant="danger" className="mt-3">
                    Erreur
                </Alert>
            )}
        </Form>
    );
}
