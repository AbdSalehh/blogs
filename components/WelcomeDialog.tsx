import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { setAuthToken } from "../utils/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

const WelcomeDialog: React.FC<Props> = ({ open, onClose }) => {
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!name || !token) {
      setError("Please fill in all fields.");
      return;
    }
    localStorage.setItem("userName", name);
    localStorage.setItem("goRestToken", token);
    setAuthToken(token);
    onClose();
  };

  return (
    <Modal title="Welcome" open={open} footer={null} closable={false}>
      <Input
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="GoRest Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ marginTop: 10 }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
        Masuk
      </Button>
    </Modal>
  );
};

export default WelcomeDialog;
