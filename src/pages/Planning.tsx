import { useState } from 'react';
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, Video, LayoutDashboard, Users, GraduationCap, BookText, School } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentView, setCurrentView] = useState<'dashboard' | 'students' | 'classes' | 'planning'>('planning');

  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Étudiants", id: "students", icon: Users, path: "/" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
  ];

  const courses = [
    { id: 'course1', name: 'Mathématiques', level: '1ère année', trace: 'trace1', video: 'video1' },
    { id: 'course2', name: 'Histoire', level: '2ème année', trace: 'trace2', video: 'video2' },
    { id: 'course3', name: 'Informatique', level: '3ème année', trace: 'trace3', video: 'video3' },
  ];

  const teachers = [
    { id: 'teacher1', name: 'M. Dupont' },
    { id: 'teacher2', name: 'Mme. Martin' },
  ];

  const classes = [
    { id: 'class1', name: 'Classe A' },
    { id: 'class2', name: 'Classe B' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="py-4 px-3">
              <h2 className="text-xl font-bold text-primary">EduManage</h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className={currentView === item.id && item.path === '/planning' ? "bg-accent" : ""}
                        onClick={() => {
                          if (item.path === '/') {
                            setCurrentView(item.id as any);
                          } else {
                            navigate(item.path);
                          }
                        }}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <header className="border-b px-6 py-3">
            <h1 className="text-2xl font-bold">
              {navItems.find(item => item.id === currentView)?.title || 'Planning'}
            </h1>
          </header>

          <main className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Calendrier</h2>
                <CalendarComponent date={date} setDate={setDate} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Courses Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cours</h3>
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-1">
                      <div className="flex items-center">
                        <span className="mr-2 font-medium">{course.name}</span>
                        {/* Remove trace property access */}
                        <div className="flex space-x-1">
                          <button className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                            <Eye className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{course.level}</p>
                      {/* Remove video property access */}
                      <div className="mt-2">
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choisir un enseignant" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Teachers Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Enseignants</h3>
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="space-y-1">
                      <span className="font-medium">{teacher.name}</span>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.id}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                {/* Classes Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Classes</h3>
                  {classes.map((cls) => (
                    <div key={cls.id} className="space-y-1">
                      <span className="font-medium">{cls.name}</span>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir un cours" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>Planning des cours.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Heure</TableHead>
                      <TableHead>Lundi</TableHead>
                      <TableHead>Mardi</TableHead>
                      <TableHead>Mercredi</TableHead>
                      <TableHead>Jeudi</TableHead>
                      <TableHead>Vendredi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">8:00 - 9:00</TableCell>
                      <TableCell>Mathématiques (Classe A)</TableCell>
                      <TableCell></TableCell>
                      <TableCell>Histoire (Classe B)</TableCell>
                      <TableCell></TableCell>
                      <TableCell>Informatique (Classe A)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">9:00 - 10:00</TableCell>
                      <TableCell>Mathématiques (Classe A)</TableCell>
                      <TableCell></TableCell>
                      <TableCell>Histoire (Classe B)</TableCell>
                      <TableCell></TableCell>
                      <TableCell>Informatique (Classe A)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

interface CalendarComponentProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date?.toLocaleDateString() : <span>Choisir une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default IndexPage;
