import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {courseCategories , courseLevelOptions , languageOptions} from "@/data/importantData.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";

function CourseLanding() {
    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    Course Landing Page
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6 mt-4 md:px-0">
                    <div className="flex flex-col gap-3">
                        <Label>Course Title</Label>
                        <Input
                            type="text"
                            placeholder="Enter Course Title (Max Length : 60 chars)"
                            id="title"
                            maxLength={60}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            Course Category
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Course Category"/>
                            </SelectTrigger>
                            <SelectContent>
                                {courseCategories.map(category => (
                                    <SelectItem key={category?.id} value={category?.label}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            Course Difficulty
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Course Difficulty"/>
                            </SelectTrigger>
                            <SelectContent>
                                {courseLevelOptions.map(level => (
                                    <SelectItem key={level?.id} value={level?.label}>
                                        {level.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            Course Language
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Course Language"/>
                            </SelectTrigger>
                            <SelectContent>
                                {languageOptions.map(lang => (
                                    <SelectItem key={lang?.id} value={lang?.label}>
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>Course Subtitle</Label>
                        <Input
                            type="text"
                            placeholder="Enter Course Sub Title (Max Length : 200 chars)"
                            id="subtitle"
                            maxLength={200}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>Course Description</Label>
                        <Textarea
                            rows={5}
                            type="text"
                            placeholder="Enter Course Description (Max Length : 600 chars)"
                            id="subtitle"
                            maxLength={600}
                            className='resize-none'
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>Course Pricing</Label>
                        <Input
                            type="text"
                            placeholder="Enter Course Pricing in dollar ($)"
                            id="pricing"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>Course Objective</Label>
                        <Textarea
                            rows={5}
                            type="text"
                            placeholder="Enter Course Objective (Max Length : 200 chars)"
                            id="objective"
                            maxLength={200}
                            className='resize-none'
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>Welcome Message</Label>
                        <Textarea
                            rows={5}
                            type="text"
                            placeholder="Enter Welcome Message For Students (Max Length : 100 chars)"
                            id="message"
                            maxLength={100}
                            className='resize-none'
                        />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default CourseLanding;