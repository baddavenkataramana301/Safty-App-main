import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Checklists = () => {
  const { user } = useAuth();
  const [checklists, setChecklists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    dueDate: "",
    status: "Pending",
    items: [],
  });
  const [newItemText, setNewItemText] = useState("");

  // Load checklists from localStorage on component mount
  useEffect(() => {
    const storedChecklists = localStorage.getItem("checklists");
    if (storedChecklists) {
      setChecklists(JSON.parse(storedChecklists));
    } else {
      // Initialize with default data if none exists
      const defaultChecklists = [
        {
          id: 1,
          title: "Daily Safety Inspection",
          department: "Production",
          dueDate: "2024-01-16",
          status: "In Progress",
          items: [
            {
              id: 1,
              text: "Check fire extinguisher pressure",
              completed: true,
            },
            { id: 2, text: "Verify emergency exit signs", completed: true },
            { id: 3, text: "Inspect PPE equipment", completed: false },
            { id: 4, text: "Test emergency alarm system", completed: false },
          ],
        },
        {
          id: 2,
          title: "Weekly Equipment Maintenance",
          department: "Maintenance",
          dueDate: "2024-01-17",
          status: "Pending",
          items: [
            { id: 1, text: "Lubricate machinery parts", completed: false },
            { id: 2, text: "Check hydraulic fluid levels", completed: false },
            { id: 3, text: "Inspect safety guards", completed: false },
          ],
        },
      ];
      setChecklists(defaultChecklists);
      localStorage.setItem("checklists", JSON.stringify(defaultChecklists));
    }
  }, []);

  // Save checklists to localStorage whenever checklists change
  useEffect(() => {
    if (checklists.length > 0) {
      localStorage.setItem("checklists", JSON.stringify(checklists));
    }
  }, [checklists]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleCreate = () => {
    if (!formData.title || !formData.department || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newChecklist = {
      id: Date.now(),
      title: formData.title,
      department: formData.department,
      dueDate: formData.dueDate,
      status: formData.status,
      items: formData.items,
    };

    setChecklists([...checklists, newChecklist]);
    setFormData({
      title: "",
      department: "",
      dueDate: "",
      status: "Pending",
      items: [],
    });
    setIsCreateDialogOpen(false);
    toast.success("Checklist created successfully");
  };

  const handleEdit = () => {
    if (!formData.title || !formData.department || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setChecklists(
      checklists.map((checklist) =>
        checklist.id === editingChecklist.id
          ? { ...checklist, ...formData }
          : checklist
      )
    );
    setFormData({
      title: "",
      department: "",
      dueDate: "",
      status: "Pending",
      items: [],
    });
    setIsEditDialogOpen(false);
    setEditingChecklist(null);
    toast.success("Checklist updated successfully");
  };

  const handleDelete = (id) => {
    setChecklists(checklists.filter((checklist) => checklist.id !== id));
    toast.success("Checklist deleted successfully");
  };

  const handleItemToggle = (checklistId, itemId) => {
    setChecklists(
      checklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : checklist
      )
    );
  };

  const handleMarkComplete = (id) => {
    setChecklists(
      checklists.map((checklist) =>
        checklist.id === id ? { ...checklist, status: "Completed" } : checklist
      )
    );
    toast.success("Checklist marked as completed");
  };

  const openEditDialog = (checklist) => {
    setEditingChecklist(checklist);
    setFormData({
      title: checklist.title,
      department: checklist.department,
      dueDate: checklist.dueDate,
      status: checklist.status,
      items: checklist.items,
    });
    setIsEditDialogOpen(true);
  };

  const addItemToForm = () => {
    if (!newItemText.trim()) return;
    const newItem = {
      id: Date.now(),
      text: newItemText.trim(),
      completed: false,
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
    setNewItemText("");
  };

  const removeItemFromForm = (itemId) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== itemId),
    });
  };

  const filteredChecklists = checklists.filter(
    (checklist) =>
      checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Safety Checklists</h1>
            <p className="text-muted-foreground">
              Complete your assigned safety inspections
            </p>
          </div>
          {user?.role !== "employee" && (
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Checklist
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Checklist</DialogTitle>
                  <DialogDescription>
                    Add a new safety checklist with inspection items.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Enter checklist title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            department: e.target.value,
                          })
                        }
                        placeholder="Enter department"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, dueDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Checklist Items</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="Add checklist item"
                        onKeyPress={(e) => e.key === "Enter" && addItemToForm()}
                      />
                      <Button type="button" onClick={addItemToForm}>
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 p-2 bg-muted rounded"
                        >
                          <span className="flex-1">{item.text}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItemFromForm(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreate}>Create Checklist</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search checklists by title or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {filteredChecklists.map((checklist) => (
                <Card key={checklist.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(checklist.status)}
                        <div>
                          <CardTitle>{checklist.title}</CardTitle>
                          <CardDescription>
                            {checklist.department} • Due: {checklist.dueDate}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {user?.role !== "employee" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(checklist)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Checklist
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "
                                    {checklist.title}"? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(checklist.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                        <Badge variant="outline">{checklist.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {checklist.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                        >
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={item.completed}
                            onCheckedChange={() =>
                              handleItemToggle(checklist.id, item.id)
                            }
                          />
                          <label
                            htmlFor={`item-${item.id}`}
                            className={`flex-1 text-sm cursor-pointer ${
                              item.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {item.text}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleMarkComplete(checklist.id)}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        {user?.role !== "employee" && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Checklist</DialogTitle>
                <DialogDescription>
                  Update checklist details and items.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter checklist title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Input
                      id="edit-department"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      placeholder="Enter department"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-dueDate">Due Date</Label>
                    <Input
                      id="edit-dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Checklist Items</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      placeholder="Add checklist item"
                      onKeyPress={(e) => e.key === "Enter" && addItemToForm()}
                    />
                    <Button type="button" onClick={addItemToForm}>
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formData.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 bg-muted rounded"
                      >
                        <span className="flex-1">{item.text}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItemFromForm(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleEdit}>Update Checklist</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Checklists;
