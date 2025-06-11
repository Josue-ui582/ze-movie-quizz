import { useCheckAuth } from "../hooks/useCheckAuth";

export default function Home() {
  const { loading, authenticated } = useCheckAuth();

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return null;

  return (
    <div>
      <h1>Bienvenue sur ta page d'accueil protégée</h1>
    </div>
  );
}
