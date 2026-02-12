import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void | Promise<void>;
	loading?: boolean;
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title = "Are you sure?",
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	onConfirm,
}: ConfirmDialogProps) {
	const handleConfirm = async () => {
		await onConfirm();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-sm sm:max-w-md rounded-2xl border border-red-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
				<DialogHeader>
					<DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-red-400 via-red-300 to-amber-200 bg-clip-text text-transparent">
						{title}
					</DialogTitle>
					{description && (
						<DialogDescription className="mt-2 text-xs sm:text-sm text-slate-300">
							{description}
						</DialogDescription>
					)}
				</DialogHeader>
				<div className="mt-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="border-slate-500 text-slate-200  bg-slate-800"
					>
						{cancelLabel}
					</Button>
					<Button
						onClick={handleConfirm}
						className="bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/40"
					>
						{confirmLabel}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

