export default function Loader({ loading }: { loading: boolean }) {
  if (loading) {
    return <div>Loading</div>;
  }
}
