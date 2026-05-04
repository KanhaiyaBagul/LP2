package cc;

import org.cloudbus.cloudsim.*;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.provisioners.BwProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.PeProvisionerSimple;
import org.cloudbus.cloudsim.provisioners.RamProvisionerSimple;

import java.text.DecimalFormat;
import java.util.*;

public class fcfs {

    private static List<Cloudlet> cloudletList;
    private static List<Vm> vmList;

    public static void main(String[] args) {

        try {
            int numUser = 1;
            Calendar calendar = Calendar.getInstance();
            boolean traceFlag = false;

            CloudSim.init(numUser, calendar, traceFlag);

            Datacenter datacenter0 = createDatacenter("Datacenter_0");

            DatacenterBroker broker = createBroker();
            int brokerId = broker.getId();

            vmList = new ArrayList<>();

            Vm vm = new Vm(
                    0,
                    brokerId,
                    1000,
                    1,
                    512,
                    1000,
                    10000,
                    "Xen",
                    new CloudletSchedulerSpaceShared()
            );

            vmList.add(vm);
            broker.submitVmList(vmList);

            cloudletList = new ArrayList<>();

            long[] length = {4000, 2000, 3000, 1000, 5000};

            for (int i = 0; i < length.length; i++) {
                Cloudlet cloudlet = new Cloudlet(
                        i,
                        length[i],
                        1,
                        300,
                        300,
                        new UtilizationModelFull(),
                        new UtilizationModelFull(),
                        new UtilizationModelFull()
                );

                cloudlet.setUserId(brokerId);
                cloudlet.setVmId(vm.getId());

                cloudletList.add(cloudlet);
            }

            // FCFS Scheduling
            cloudletList.sort(Comparator.comparingInt(Cloudlet::getCloudletId));

            broker.submitCloudletList(cloudletList);

            CloudSim.startSimulation();

            List<Cloudlet> newList = broker.getCloudletReceivedList();

            CloudSim.stopSimulation();

            printCloudletList(newList);

            System.out.println("FCFS Simulation Finished!");

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Simulation terminated due to error");
        }
    }

    private static Datacenter createDatacenter(String name) {

        List<Host> hostList = new ArrayList<>();

        List<Pe> peList = new ArrayList<>();
        peList.add(new Pe(0, new PeProvisionerSimple(1000)));

        int hostId = 0;
        int ram = 2048;
        long storage = 1000000;
        int bw = 10000;

        hostList.add(
                new Host(
                        hostId,
                        new RamProvisionerSimple(ram),
                        new BwProvisionerSimple(bw),
                        storage,
                        peList,
                        new VmSchedulerTimeShared(peList)
                )
        );

        String arch = "x86";
        String os = "Linux";
        String vmm = "Xen";

        DatacenterCharacteristics characteristics = new DatacenterCharacteristics(
                arch, os, vmm, hostList,
                10.0, 3.0, 0.05, 0.1, 0.1
        );

        Datacenter datacenter = null;

        try {
            datacenter = new Datacenter(
                    name,
                    characteristics,
                    new VmAllocationPolicySimple(hostList),
                    new LinkedList<Storage>(),
                    0
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

        return datacenter;
    }

    private static DatacenterBroker createBroker() throws Exception {
        return new DatacenterBroker("Broker");
    }

    private static void printCloudletList(List<Cloudlet> list) {

        String indent = "    ";

        System.out.println("\n========== OUTPUT ==========");
        System.out.println("Cloudlet ID" + indent + "STATUS" + indent +
                "VM ID" + indent + "Time" + indent +
                "Start Time" + indent + "Finish Time");

        DecimalFormat dft = new DecimalFormat("###.##");

        for (Cloudlet cloudlet : list) {

            System.out.print(cloudlet.getCloudletId() + indent);

            if (cloudlet.getStatus() == Cloudlet.SUCCESS) {

                System.out.print("SUCCESS");

                System.out.println(indent + indent + cloudlet.getVmId()
                        + indent + dft.format(cloudlet.getActualCPUTime())
                        + indent + dft.format(cloudlet.getExecStartTime())
                        + indent + dft.format(cloudlet.getFinishTime()));
            }
        }
    }
}