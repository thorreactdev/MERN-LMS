import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {useAuth} from "@/context/AuthContext.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

function PricingModal({onChange, onChangeDiscount,valueDiscount, value, onConfirm, onCancel}) {
    const {user} = useAuth();
    return (
        <Card className="max-w-xl border-none z-50">
            <div className="bg-background rounded-lg shadow-lg">
                <CardHeader className="flex flex-col gap-2">
                    <CardTitle>
                        Hello , Creator <span className="capitalize">{user?.username}</span>
                    </CardTitle>
                    <CardDescription>
                        Every course you create will include a minimum of a 10% discount. This ensures better
                        affordability and attracts more students to enroll. Set your course pricing with this discount
                        in mind for maximum impact.
                    </CardDescription>

                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>
                            Enter Your Original Pricing Here
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter Amount"
                            onChange={onChange}
                            value={value}
                        />
                    </div>
                    <div className="">
                        <p className="text-muted-foreground text-sm my-2">
                            NOTE : You can also add your discount percentage which should be more than 10%. If not the
                            default discount will be 10%
                        </p>
                        <div className="mt-2 flex flex-col gap-2">
                            <Label>
                                Enter Discount Percentage
                            </Label>
                            <Input
                                type="text"
                                placeholder="Enter Discount Percentage Ex. 15"
                                onChange={onChangeDiscount}
                                value={valueDiscount}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                    <Button onClick={onConfirm}>
                        Confirm
                    </Button>
                    <Button variant="destructive" onClick={onCancel}>
                        Cancel
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default PricingModal;
