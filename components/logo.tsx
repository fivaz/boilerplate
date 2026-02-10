import { ComponentProps } from "react";

import { FileCodeIcon } from "lucide-react";

type LogoProps = ComponentProps<"svg">;

export function Logo(props: LogoProps) {
	return <FileCodeIcon {...props} />;
}
