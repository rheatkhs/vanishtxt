import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

export default function Tooltip({ content, children }: { content: string; children: ReactNode }) {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root delayDuration={100}>
                <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side="top"
                        align="center"
                        className="z-50 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white shadow-md backdrop-blur-md"
                        sideOffset={8}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-white/20" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
