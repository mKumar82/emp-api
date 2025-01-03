"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { handleRequest } from "@/actions/action";
import Description from "./Description";
import { toast } from "react-hot-toast";

const Hero = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [url, setUrl] = useState(
    `http://${window.location.hostname}:${
      window.location.port || 3000
    }/api/employees`
  );
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState(
    '{"id": "1", "name": "John Doe", "position": "Software Engineer","department": "Engineering"}'
  );
  const [response, setResponse] = useState(null);

  const onSubmit = async () => {
    let parsedBody = null;
    if (method !== "GET" && body) {
      try {
        parsedBody = JSON.parse(body);
      } catch (error) {
        console.error("Invalid JSON body", error);
        toast.error("Invalid JSON body");
        return;
      }
    }
    try {
      const data = await handleRequest(method, url, parsedBody);
      if (data.error) {
        toast.error(data.error);
      } else {
        setResponse(data);
        toast.success("Request successful");
      }
    } catch (error) {
      console.error("Request failed", error);
      toast.error("Request failed");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setIsCopied(true);
  };

  return (
    <div className="w-full h-20 mx-auto flex  items-center flex-col">
      <div className="w-full h-10 lg:max-w-4xl  flex lg:flex-row flex-col gap-5 justify-between">
        <div className="h-full sm:w-full lg:max-w-sm">
          <Select value={method} onValueChange={(value) => setMethod(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="GET" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-auto">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          {["POST", "PUT"].includes(method) && (
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-auto p-2 mb-4  text-pretty "
              rows={4}
            />
          )}
        </div>
        <div className="w-[20%]">
          <Button onClick={onSubmit} variant="default">
            Send Request
          </Button>
        </div>
      </div>

      <div className="lg:w-3/4 w-full h-auto bg-slate-100 p-3 my-28 mx-auto">
        <div className="flex float-end bg-black">
          <Button onClick={copyToClipboard}>
            {!isCopied ? <ContentCopyIcon /> : <DoneIcon />}
          </Button>
        </div>

        <div className="min-h-10">
          {response && (
            <pre className="text-wrap">
              {response ? JSON.stringify(response, null, 2) : "No data"}
            </pre>
          )}
        </div>
      </div>

      <Description />
    </div>
  );
};

export default Hero;
