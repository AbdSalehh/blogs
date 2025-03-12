import { useState } from "react";
import { Modal, Input, Button, Flex } from "antd";
import { setAuthToken } from "../utils/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

function WelcomeDialog({ open, onClose }: Props) {
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
    setName("");
    setToken("");
    onClose();
  };

  return (
    <Modal title="Welcome" open={open} footer={null} closable={false}>
      <p>Enter your name and GoRest token to get started.</p>
      <Flex vertical gap={10} className="mt-3">
        <div>
          <label>Name*</label>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Token*</label>
          <Input
            placeholder="GoRest Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ marginTop: 10 }}
          />
        </div>
      </Flex>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
        Confirm
      </Button>
    </Modal>
  );
}

export default WelcomeDialog;
